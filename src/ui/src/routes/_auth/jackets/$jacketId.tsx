import { createFileRoute, redirect } from '@tanstack/react-router'
import { format } from 'date-fns'
import { CalendarIcon, Folder, Handshake, Receipt } from 'lucide-react'
import { jacketService } from '@/api/services/jacket-service.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'

export const Route = createFileRoute('/_auth/jackets/$jacketId')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.hasPermission('Jacket_Read')) {
      throw redirect({
        to: '/unauthorized',
        search: {
          redirect: location.href,
          reason: 'insufficient_permissions',
        },
      })
    }
    return {
      hasPermission: context.auth.hasPermission,
    }
  },
  loader: async ({ params: { jacketId } }) => {
    const response = await jacketService.getJacket({ jacketId: Number(jacketId) })
    return {
      jacket: response,
      crumb: 'View Jacket',
    }
  },
  notFoundComponent: () => {
    return <p>Jacket not found!</p>
  },
  component: JacketComponent,
})

function JacketComponent() {
  const { jacket } = Route.useLoaderData()

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">View Job Jacket {jacket.workOrderNumber}</h1>
      </div>

      {/* Job Jacket Properties */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Job Jacket Properties</h3>
            <p className="text-muted-foreground text-sm">Basic specifications of the Work Order</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Work Order Number</span>
            </div>
            <p className="text-lg">{jacket.workOrderNumber}</p>
          </div>

          <div className="col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Jacket Date</span>
            </div>
            <p className="text-lg">{format(new Date(jacket.jacketDate), 'PPP')}</p>
          </div>

          <div className="col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sales Order Number</span>
            </div>
            <p className="text-lg">{jacket.salesOrderNumber || 'Not specified'}</p>
          </div>

          <div className="col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <Handshake className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Customer PO Number</span>
            </div>
            <p className="text-lg">{jacket.customerPurchaseOrderNumber || 'Not specified'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
