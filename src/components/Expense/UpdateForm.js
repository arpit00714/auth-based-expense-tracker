import { useState,useEffect } from "react"

const UpdateForm = ({edit,setShow,id,data}) => {
    const [enteredAmount, setAmount] = useState('')
    const [enteredDesc, setDesc] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
      setAmount(data?.amount)
      setCategory(data?.category)
      setDesc(data?.description)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (enteredAmount !== '' && enteredDesc !== '' && category !== '') {

            const obj = {
                amount: enteredAmount,
                description: enteredDesc,
                category : category
            }

           edit(obj,id)
            setShow(prev => !prev)
        }

    }

    const handleChange = (e) => {

        if (e.target.name === 'description') setDesc(e.target.value)
        if (e.target.name === 'amount') setAmount(e.target.value)
        if (e.target.name === 'category') setCategory(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="new-expense">
            <div className="new-expense__controls">

                <div className="new-expense__control">
                    <label htmlFor="amount">Amount </label>
                    <input value={enteredAmount} onChange={handleChange} name="amount" type="number" min={10} required />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="title">Description </label>
                    <input value={enteredDesc} onChange={handleChange} name="description" type="text" required minLength={6} />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="category"> Select Your Category </label>
                    <select value={category} name="category" onChange={handleChange} required>
                        <option value="fuel">fuel</option>
                        <option value="food">food</option>
                        <option value="electricity">electricity</option>
                        <option value="movies">movies</option>
                    </select>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit" className="edit"> Update</button>
            </div>
        </form>
    )
}

export default UpdateForm;