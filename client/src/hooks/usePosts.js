import { useQuery, useMutation, useQueryClient } from 'react-query'
import { postService } from '../services/api'

export const usePosts = (params = {}) => {
  return useQuery(['posts', params], () => postService.getPosts(params), {
    keepPreviousData: true
  })
}

export const usePost = (id) => {
  return useQuery(['post', id], () => postService.getPost(id), {
    enabled: !!id
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation(postService.createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ id, data }) => postService.updatePost(id, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('posts')
        queryClient.invalidateQueries(['post', variables.id])
      }
    }
  )
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation(postService.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ id, content }) => postService.addComment(id, content),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['post', variables.id])
      }
    }
  )
}