export class SafeUri {
  static safeUri (uri) {
    let good = decodeURI(uri)
    while (good !== uri) {
      uri = good
      good = decodeURI(uri)
    }
    return encodeURI(good)
  }

  static safe (uri) {
    if (uri instanceof Array) {
      return uri.map(u => SafeUri.safe(u))
    }
    return SafeUri.safeUri(uri)
  }

  static indexOf (array, uri) {
    for (let i = 0; i < array.length; i++) {
      if (SafeUri.safe(array[i]) === SafeUri.safe(uri)) {
        return i
      }
    }
    return -1
  }
}

export class SrcUtil {
  static indexOf (array, src) {
    for (let i = 0; i < array.length; i++) {
      if (SrcUtil.same(array[i], src)) {
        return i
      }
    }
    return -1
  }

  static same (src1, src2) {
    if (src1 instanceof Array && typeof src2 === 'string') {
      return SafeUri.indexOf(src1, src2) !== -1
    } else if (src2 instanceof Array && typeof src1 === 'string') {
      return SafeUri.indexOf(src2, src1) !== -1
    } else if (src1 instanceof Array && src2 instanceof Array) {
      const m = {}
      SafeUri.safe(src1).forEach((src) => { m[src] = true })
      SafeUri.safe(src2).forEach((src) => { m[src] = true })
      return Object.keys(m).length < src1.length + src2.length
    }
    return SafeUri.safe(src1) === SafeUri.safe(src2)
  }
}
