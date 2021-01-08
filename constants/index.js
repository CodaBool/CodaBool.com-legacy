
// This function allows a jwt to be parsed
// requires atob which may be a default function for serverside

// import atob from 'atob'
// export function parseJwt(token) {
//   var base64Url = token.split('.')[1]
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))
//   return JSON.parse(jsonPayload)
// }

export function dateParsed(obj) {
  for (let [key, value] of Object.entries(obj)) {
    if (value !== null) {
      if (typeof value === 'object' && typeof value.getMonth === 'function') {
				value = JSON.parse(JSON.stringify(value))
      } else if (typeof value === 'object') {
        value = dateParsed(value)
      }
    }
    obj[key] = value
  }
	return obj
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function genHexFromString(seed) {
  let color = ''
  color = Math.floor((Math.abs(Math.sin(seed.charCodeAt(0)) * 16777215)) % 16777215);
  color = color.toString(16);
  while (color.length < 6) {
    color = '0' + color;
  }
  return color;
}