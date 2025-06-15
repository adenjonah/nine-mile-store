import { StoreDataProvider } from '../../lib/StoreDataContext'

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreDataProvider>
      {children}
    </StoreDataProvider>
  )
} 