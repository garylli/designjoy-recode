import { ReactNode } from "react"

const ActionTile = (props: {
  icon: ReactNode,
  title: string,
  subtitle: string,
  href: string
}) => {
  return <a href={props.href} className={'flex items-center'}>
    <div className={'size-8 mr-3'}>
        {props.icon}
    </div>
    <div>
      <p className={'text-sm text-white-smoke'}>{props.title}</p>
      <p className={'text-sm text-light-steel-blue'}>{props.subtitle}</p>
    </div>
  </a>
}

export {ActionTile}