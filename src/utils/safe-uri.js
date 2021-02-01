export class SafeUri {
  static safeUri (src) {
    let good = decodeURI(src)
    while (good !== src) {
      src = good
      good = decodeURI(src)
    }
    return encodeURI(good)
  }

  static safe (src) {
    if (src instanceof Array) {
      return src.map(s => SafeUri.safe(s))
    }
    return SafeUri.safeUri(src)
  }

  static indexOf (array, src) {
    for (let i = 0; i < array.length; i++) {
      if (SafeUri.safe(array[i]) === SafeUri.safe(src)) {
        return i
      }
    }
    return -1
  }
}
