export const connect = (mapStateToProps) => (ClassName) => {
  if (typeof ClassName !== 'function') throw new Error(`${ClassName.name} has to be a function or class`)

  ClassName.prototype.updateProps = function () {
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

  ClassName.prototype.updateStateContext = function () {
    this.updateProps = this.updateProps.bind(this)
    const props = mapStateToProps(this.context.kokoro.getState())
    const propKeys = Object.keys(props)
    propKeys.forEach(key => {
      this[key] = props[key]
    })
    this.context.kokoro.subscribe(this.updateProps)
  }

  let userDefinedFirstUpdated = ClassName.prototype.firstUpdated
  ClassName.prototype.firstUpdated = function (updatedProperties) {
    this.updateStateContext()
    userDefinedFirstUpdated = userDefinedFirstUpdated.bind(this)
    userDefinedFirstUpdated(updatedProperties)
  }

  ClassName.prototype.contextChangedCallback = function (name, oldValue, value) {
    if (name === 'kokoro' && oldValue) {
      oldValue.unsubscribe(this.updateProps)
    }
    this.updateStateContext()
    this.requestUpdate()
  }

  return ClassName
}
