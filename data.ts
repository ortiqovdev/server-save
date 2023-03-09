import fs from 'fs'

export type Anketa ={
  id:string
  name: string
  surname:string
  age:string
  target:string
}
export const anketas:Anketa[] =[]

export function save(){
  fs.writeFileSync('anketas', JSON.stringify(anketas))
}

export function load(){
  let content = fs.readFileSync('anketas', 'utf-8')
  const array = JSON.parse(content)
  anketas.push(...array)
}