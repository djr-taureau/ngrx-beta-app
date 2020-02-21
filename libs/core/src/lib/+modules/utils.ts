export const queryParamsToObject = (search) => {
  return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value)
    }) : { dialog: '' }
}
// If the url has a queryparam 'localhost/notes?dialog=addNote' we show bar module, if not, we show foo module
export const isDialog = (dialog) => {
  if (window && window.location.search) {
    const queryParams = queryParamsToObject(window.location.search.substring(1))
    return queryParams.dialog.indexOf(dialog) !== -1
  }
  return false
}

export const isRoute = (url, route) => {
  if (!url || !url[0] || !url[0].path) return null
  return url[0].path === route
}
