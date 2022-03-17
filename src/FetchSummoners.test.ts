import { renderHook, act } from '@testing-library/react-hooks'
import useFetchSummoners from './FetchSummoners';

test('gets class from class id', () => {
  const { result } = renderHook(() => useFetchSummoners())

  act(() => {

  })

  expect(result.current.summoners.length).toBe(0)  
  expect(result.current.loading).toBe(false)
});