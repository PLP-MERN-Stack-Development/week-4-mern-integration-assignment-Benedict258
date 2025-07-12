import { useQuery, useMutation, useQueryClient } from 'react-query'
import { categoryService } from '../services/api'

export const useCategories = () => {
  return useQuery('categories', categoryService.getCategories)
}

export const useCategory = (id) => {
  return useQuery(['category', id], () => categoryService.getCategory(id), {
    enabled: !!id
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation(categoryService.createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ id, data }) => categoryService.updateCategory(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories')
      }
    }
  )
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation(categoryService.deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    }
  }
  )
}