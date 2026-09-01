interface ILayoutProps {
  children: React.ReactNode
}

const Test = ({ children }: ILayoutProps) => {
  return <div>olá Mundo{children}</div>
}

export { Test }
