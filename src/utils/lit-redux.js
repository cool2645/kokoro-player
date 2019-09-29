export const connect = (mapStateToProps) => (ClassName) => {
  if (typeof ClassName !== 'function') throw new Error(`${ClassName.name} has to be a function or class`)

  return class extends ClassName {
    static get observedContexts () {
      const oc = ['kokoro']
      if (ClassName.observedContexts) {
        oc.push(...ClassName.observedContexts.filter(c => c !== 'kokoro'))
      }
      return oc
    }

    constructor () {
      super()
      this.___updateProps = this.___updateProps.bind(this)
    }

    ___updateProps () {
      const updatedProps = mapStateToProps(this.context.kokoro.getState())
      const updatedPropKeys = Object.keys(updatedProps)
      updatedPropKeys.forEach(key => {
        if (this[key] !== updatedProps[key]) {
          if (typeof updatedProps[key] === 'object') {
            this[key] = { ...updatedProps[key] }
          } else {
            this[key] = updatedProps[key]
          }
        }
      })
    }

    ___updateStateContext () {
      if (this.context.kokoro) {
        const props = mapStateToProps(this.context.kokoro.getState())
        const propKeys = Object.keys(props)
        propKeys.forEach(key => {
          this[key] = props[key]
        })
        this.context.kokoro.subscribe(this.___updateProps)
      }
    }

    firstUpdated (updatedProperties) {
      this.___updateStateContext()
      super.firstUpdated(updatedProperties)
    }

    contextChangedCallback (name, oldValue, value) {
      if (name === 'kokoro') {
        if (oldValue) oldValue.unsubscribe(this.___updateProps)
        this.___updateStateContext()
      }
      if (super.contextChangedCallback) {
        super.contextChangedCallback(name, oldValue, value)
      }
      this.requestUpdate()
    }
  }
}
