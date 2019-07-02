package merkle

import (
	"fmt"
	"reflect"
	"testing"
)

func TestComputeSkipPointers(t *testing.T) {
	var tests = []struct {
		in  int64
		out []int64
	}{
		{0, nil},
		{1, nil},
		{2, []int64{1}},
		{3, []int64{2, 1}},
		{4, []int64{3, 2}},
		{5, []int64{4, 3, 1}},
		{16, []int64{15, 14, 12, 8}},
		{31, []int64{30, 29, 27, 23, 15}},
		{32, []int64{31, 30, 28, 24, 16}},
		{33, []int64{32, 31, 29, 25, 17, 1}},
		{100, []int64{99, 98, 96, 92, 84, 68, 36}},
		{255, []int64{254, 253, 251, 247, 239, 223, 191, 127}},
		{256, []int64{255, 254, 252, 248, 240, 224, 192, 128}},
		{257, []int64{256, 255, 253, 249, 241, 225, 193, 129, 1}},
		{1000, []int64{999, 998, 996, 992, 984, 968, 936, 872, 744, 488}},
		{2048, []int64{2047, 2046, 2044, 2040, 2032, 2016, 1984, 1920, 1792, 1536, 1024}},
		{123456, []int64{
			123455, 123454, 123452, 123448, 123440, 123424, 123392, 123328,
			123200, 122944, 122432, 121408, 119360, 115264, 107072, 90688,
			57920,
		}},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(fmt.Sprintf("%+v", tt.in), func(t *testing.T) {
			actual := ComputeSkipPointers(tt.in)
			if !reflect.DeepEqual(actual, tt.out) {
				t.Errorf("(%d): expected %#v, actual %#v", tt.in, tt.out, actual)
			}
		})
	}
}

func TestComputeSkipPath(t *testing.T) {
	tests := []struct {
		start    int64
		end      int64
		expected []int64
	}{
		{100, 2033, []int64{1009, 497, 241, 113, 105, 101}},
		{100, 102, []int64{}},
		{100, 103, []int64{101}},
		{200, 100, []int64{}},
	}
	for _, test := range tests {
		got := ComputeSkipPath(test.start, test.end)
		if !reflect.DeepEqual(got, test.expected) {
			t.Fatalf("Failed on input (%d, %d), expected %v, got %v.", test.start, test.end, test.expected, got)
		}
	}
}
