import { PhoneFrame } from './components/Screen'
import { Cover } from './screens/Cover'
import { groups, screens } from './screens'

/** The static mockup set: the cover card, then every screen grouped by flow. */
export function Gallery() {
  return (
    <>
      <section className="grp">
        <Cover />
      </section>

      {groups.map((group, index) => (
        <section key={group.num} className="grp" style={index === groups.length - 1 ? { paddingBottom: 56 } : undefined}>
          <div className="grp-hd">
            <span className="grp-num">{group.num}</span>
            <span className="grp-name">{group.name}</span>
            <span className="grp-line" />
          </div>
          <div className="row">
            {group.ids.map((id) => {
              const { caption, Component } = screens[id]
              return (
                <div key={id}>
                  <PhoneFrame>
                    <Component />
                  </PhoneFrame>
                  <div className="cap">{caption}</div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
