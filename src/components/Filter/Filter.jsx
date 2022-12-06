import css from './Filter.module.css'
export const Filter = ({ filter,  onChange})=>{
    
   return (<label className={css.label}><span className={css.title}>Find contacts by name</span><input type="text" title={'Start typing the contact name..'} value={filter} onChange={onChange}/></label>
   
   )
}
