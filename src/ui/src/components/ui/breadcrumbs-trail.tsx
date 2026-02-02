import { isMatch, useMatches } from '@tanstack/react-router'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'

export const BreadcrumbsTrail = () => {
  const matches = useMatches()

  if (matches.some((match) => match.status === 'pending')) return null

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <React.Fragment key={i}>
            {i + 1 < matchesWithCrumbs.length ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={match.fullPath}>{match.loaderData?.crumb}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{match.loaderData?.crumb}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
