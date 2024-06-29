export const InputItem = ({label, placeholder,onChange}) => {
    return <div>
        <div className="font-medium text-left text-sm py-2">{label}</div>
        <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border border-slate-200 rounded" />
    </div>
}