"use client"

import { useState, useEffect, useCallback } from "react"

interface DataState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

type DataFetcher<T> = () => Promise<T>

/**
 * Hook personnalisé pour remplacer les hooks d'API
 * Gère le chargement des données, les états de chargement et d'erreur
 */
export function useData<T>(
  dataFetcher: DataFetcher<T>,
  dependencies: any[] = [],
): DataState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<DataState<T>>({
    data: null,
    isLoading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const data = await dataFetcher()
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Une erreur est survenue"),
      })
    }
  }, [dataFetcher])

  useEffect(() => {
    fetchData()
  }, [...dependencies])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return { ...state, refetch }
}

/**
 * Hook pour les opérations de mutation (POST, PUT, DELETE)
 */
export function useMutation<T, P = any>(
  mutationFn: (params: P) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  } = {},
) {
  const [state, setState] = useState<DataState<T> & { isSuccess: boolean }>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  })

  const mutate = useCallback(
    async (params: P) => {
      setState({ data: null, isLoading: true, error: null, isSuccess: false })
      try {
        const data = await mutationFn(params)
        setState({ data, isLoading: false, error: null, isSuccess: true })
        options.onSuccess?.(data)
        return data
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Une erreur est survenue")
        setState({ data: null, isLoading: false, error: err, isSuccess: false })
        options.onError?.(err)
        throw err
      }
    },
    [mutationFn, options],
  )

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null, isSuccess: false })
  }, [])

  return { ...state, mutate, reset }
}
