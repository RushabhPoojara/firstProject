

export const Balance = ({value}) => {

    return <div className="flex flex-col">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className=" ml-4 font-semibold text-lg">
                ₹ {value}
        </div>
    </div>
}