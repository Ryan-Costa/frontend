const ListEmpty = ({ missingContent }: { missingContent: string }) => {
    return <h1 className="text-semibold text-xl">Não há { missingContent }</h1>
}

export default ListEmpty;