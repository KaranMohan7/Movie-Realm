import React from 'react'

const Dropdown = ({func,title,options}) => {
  return (
    <>
       <div>
        <select onChange={(e) => func(e.target.value)} className='p-1 md:p-2 lg:p-2 rounded-md outline-none' name="format" id="format" defaultValue={0}>
            <option  value={0} disabled>
             {
                title
             }
            </option>
            {
                options.map((item,index) => (
                    <option value={item} key={index}>
                        {item.toUpperCase()}
                    </option>
                ))
            }
        </select>
        </div> 
    </>
  )
}

export default Dropdown