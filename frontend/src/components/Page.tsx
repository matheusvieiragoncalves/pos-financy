interface IPageProps {
  children: React.ReactNode
}

export function Page({ children }: IPageProps) {
  return (
    <div className="min-h-[calc(100vh-9rem)] rounded-xl bg-white p-12">
      {children}
    </div>
  )
}
