package merkle

func ComputeSkipPointers(s int64) []int64 {
	if s <= 1 {
		return nil
	}
	var skips []int64
	r := int64(1)
	s -= r
	for s > 0 {
		skips = append(skips, s)
		s -= r
		r *= 2
	}
	return skips
}

// computeSkipPath computes a log pattern skip path in reverse
// e.g., start=100, end=2033 -> ret = {1009, 497, 241, 113, 105, 101}
// such that ret[i+1] \in computeSkipPointers(ret[i])
func ComputeSkipPath(start int64, end int64) []int64 {
	if end <= start {
		return []int64{}
	}
	jumps := []int64{}
	diff := end - start
	z := int64(1)
	for diff > 0 {
		if diff&1 == 1 {
			start += z
			jumps = append(jumps, start)
		}
		diff >>= 1
		z *= 2
	}

	for i := len(jumps)/2 - 1; i >= 0; i-- {
		opp := len(jumps) - 1 - i
		jumps[i], jumps[opp] = jumps[opp], jumps[i]
	}

	return jumps[1:] // ignore end
}
