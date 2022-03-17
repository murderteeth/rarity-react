import { renderHook, act } from '@testing-library/react-hooks'
import { useSummoners } from './SummonersContext';

test('gets class from class id', () => {
  const { result } = renderHook(() => useSummoners())

  act(() => {

  })

  expect(result.current.summoners.length).toBe(0)  
  expect(result.current.loading).toBe(false)
});