function _bem(prefixName: string, block: string, el: string, mod: string) {
  if (block) {
    prefixName += `-${block}`
  } 

  if (el) {
    prefixName += `__${el}`
  }

  if (mod) {
    prefixName += `--${mod}`
  }

  return prefixName
}

function createBEM(prefixName: string) {
  const b = (block = '') => _bem(prefixName, block, '', '');
  const e = (el = '') => el ? _bem(prefixName, '', el, '') : '';
  const m = (mod = '') => mod ? _bem(prefixName, '', '', mod) : '';
  const be = (block = '', el = '') => block && el ? _bem(prefixName, block, el, '') : '';
  const em = (el = '', mod = '') => el && mod ? _bem(prefixName, '', el, mod) : '';
  const bm = (block = '', mod = '') => block && mod ? _bem(prefixName, block, '', mod) : '';
  const bem = (block = '', el = '', mod = '') => block && el && mod ? _bem(prefixName, block, el, mod) : '';

  const is = (name: string, state: string | boolean) => state ? `is-${name}` : '';

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  }
}

export function createNameSpace(name: string) {
  const prefixName = `r-${name}`
  return createBEM(prefixName)
}

/*
const bem = createNameSpace('button');
console.log(bem.b('box'))
console.log(bem.bem('box', 'header', 'active'))
console.log(bem.is('active', true))
*/