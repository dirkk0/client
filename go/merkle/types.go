package merkle

import (
	"github.com/keybase/client/go/msgpack"
	"github.com/keybase/client/go/protocol/keybase1"
	merkletree "github.com/keybase/go-merkle-tree"
	"github.com/pkg/errors"
)

type BlockValue merkletree.Node

type Block struct {
	Hash  []byte
	Value []byte
}

type EncodingType byte

const (
	EncodingTypeBlindedSHA256v1 EncodingType = 1 // p = HMAC-SHA256; (k, v) -> (k, p(p(k, s), v)) where s is a secret unique per Merkle seqno
)

type EncodedLeaf []byte

var _ merkletree.ValueConstructor = (*EncodedLeaf)(nil)

func (l EncodedLeaf) Construct() interface{} {
	return &[]byte{}
}

type LeafType uint16

const (
	LeafTypeChain17v1 = 1
)

type LeafContainer struct {
	_struct   bool     `codec:",toarray"`
	leafType  LeafType // specifies structure of leafBytes
	leafBytes []byte   // msgpack deserialization implements Leaf
}

func NewLeafContainer(leafType LeafType, leafBytes []byte) LeafContainer {
	return LeafContainer{leafType: leafType, leafBytes: leafBytes}
}

func (c LeafContainer) Serialize() ([]byte, error) {
	return msgpack.Encode(c)
}

type Leaf interface {
	Serialize() ([]byte, error)
	Type() LeafType
}

type Chain17v1Leaf struct {
	_struct bool `codec:",toarray"`
	TeamID  []byte
	SigID   []byte
	LinkID  []byte
	Seqno   uint64
}

var _ Leaf = (*Chain17v1Leaf)(nil)

func (l Chain17v1Leaf) Serialize() ([]byte, error) {
	return msgpack.Encode(l)
}

func (l Chain17v1Leaf) Type() LeafType {
	return LeafTypeChain17v1
}

func ExportLeaf(l Leaf) (LeafContainer, error) {
	b, err := l.Serialize()
	if err != nil {
		return LeafContainer{}, errors.Wrap(err, "failed to serialize leaf")
	}
	return NewLeafContainer(l.Type(), b), nil
}

type Skips map[int64][]byte

type RootMetadata struct {
	_struct      bool         `codec:",toarray"`
	EncodingType EncodingType `codec:"e"`
	Seqno        int64        `codec:"s"`
	Skips        Skips        `codec:"t"` // includes prev
	RootHash     []byte       `codec:"r"`
}

type Root struct {
	// No plain "Hash"; always HashMeta!
	Seqno        keybase1.Seqno
	Ctime        keybase1.Time
	HashMetadata []byte
	Metadata     []byte
}

type Path struct {
	CurrentRoot Root    `codec:"c"`
	Path        []Block `codec:"p"` // nil if not requested
	Skips       []Root  `codec:"s"` // nil if not requested
}

var Cfg = merkletree.NewConfig(SHA256Hasher{}, 2, 4, EncodedLeaf{})
