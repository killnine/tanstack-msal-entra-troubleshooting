import { z } from 'zod'
import { apiClient } from '../client.ts'
import type { JobJacketSummary } from '@/types/job-jacket-summary.ts'
import type { JobJacket } from '@/types/job-jacket.ts'
import { jobJacketSummarySchema } from '@/types/job-jacket-summary.ts'

export interface GetJacketListParams {
  searchStartDate?: string | null // ISO date string
  searchEndDate?: string | null // ISO date string
  item?: string
  material?: string
  customer?: string
  queryString?: string
}

export interface GetJacketParams {
  jacketId: number
}

export interface CloneJacketParams {
  jacketId: number
}

export interface UpsertJacketResponse {
  jacketId: number
  message: string
}

export interface UpsertJacketCustomerParams {
  id: number
  version?: string | null | undefined
  customerId: number
  overrunPercentage?: number | null
}

export interface UpsertJacketItemSpecificationValueParams {
  specificationId: number
  overrideValue: string | null | undefined
}

export interface UpsertJacketItemParams {
  id: number
  version?: string | null | undefined
  itemId: number
  quantity: number
  adjustedQuantity: number
  customOverrunPercentage?: number
  defaultOverrunPercentage?: number
  specificationOverrides: UpsertJacketItemSpecificationValueParams[]
}

export interface UpsertJacketMaterialParams {
  id: number
  version?: string | undefined | null
  itemId: number
  quantity: number
}

export interface UpsertWorkStepParams {
  id: number
  version?: string | null | undefined
  workStepTypeId: number
  content: string
}

export interface UpsertEstimateParams {
  quantity: number
  unitOfMeasureId: number
}

export interface UpsertJacketParams {
  id: number
  version?: string | null | undefined
  jacketDate: Date
  workOrderNumber: string
  salesOrderNumber?: string
  customerPurchaseOrderNumber?: string
  jacketCustomers: UpsertJacketCustomerParams[]
  jacketItems: UpsertJacketItemParams[]
  jacketMaterials: UpsertJacketMaterialParams[]
  workSteps: UpsertWorkStepParams[]
  estimate: UpsertEstimateParams
}

export interface DeleteJacketParams {
  jacketId: number
}

export const jacketService = {
  getJacket: async (params: GetJacketParams): Promise<JobJacket> => {
    const { jacketId } = params

    const url = `/jackets/${jacketId}`

    return await apiClient.get<JobJacket>(url)
  },
  cloneJacket: async (params: CloneJacketParams): Promise<JobJacket> => {
    const { jacketId } = params

    const url = `/jackets/${jacketId}/clone`

    return await apiClient.post<JobJacket>(url, {
      jacketId,
    })
  },
  getJacketList: async (params: GetJacketListParams): Promise<JobJacketSummary[]> => {
    const { searchStartDate, searchEndDate, item, material, customer, queryString } = params

    const url = `/jackets/list`

    try {
      const response = await apiClient.post<JobJacketSummary[]>(url, {
        params: {
          StartDate: searchStartDate,
          EndDate: searchEndDate,
          Item: item,
          Material: material,
          Customer: customer,
          QueryString: queryString,
        },
      })

      return z.array(jobJacketSummarySchema).parse(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('API response format is invalid', error)
      }
      throw error
    }
  },
  upsertJacket: async (params: UpsertJacketParams): Promise<UpsertJacketResponse> => {
    const {
      id,
      version,
      jacketDate,
      workOrderNumber,
      salesOrderNumber,
      customerPurchaseOrderNumber,
      jacketCustomers,
      jacketItems,
      jacketMaterials,
      workSteps,
      estimate,
    } = params

    const url = `/jackets`

    try {
      const response = await apiClient.post<UpsertJacketResponse>(url, {
        id,
        version,
        jacketDate,
        workOrderNumber,
        salesOrderNumber,
        customerPurchaseOrderNumber,
        jacketCustomers,
        jacketItems,
        jacketMaterials,
        workSteps,
        estimate,
      })

      // Validate against schema
      return z
        .object({
          jacketId: z.number(),
          message: z.string(),
        })
        .parse(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Zod validation error:', error.errors)
      }

      throw error
    }
  },
  deleteJacket: async (params: DeleteJacketParams): Promise<void> => {
    const { jacketId } = params

    const url = `/jackets/${jacketId}`

    await apiClient.delete<void>(url)
  },
  renderJacket: async (jacketId: number): Promise<Blob> => {
    const url = `/jackets/${jacketId}/render`
    return await apiClient.get<Blob>(url, { responseType: 'blob' })
  },
}
