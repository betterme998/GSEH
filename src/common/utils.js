export function debounce(func, delay){//函数，时间
  let timer = null

  return function (...args){
    if(timer) clearTimeout(timer)

    timer = setTimeout(() =>{
      func.apply(this, args)
    },delay)
  }
}