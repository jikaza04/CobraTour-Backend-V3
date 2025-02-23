

function StatusHistory({status}) {
    let statuscolor;
switch (status) {
    case 'Added':
        statuscolor = "green";
        break;
    case 'Updated':
        statuscolor = "orange";
        break;
        case 'Removed': 
        statuscolor = "red";
        break;
    case 'Default': 
        statuscolor = "gray";
        break;

}
  return (
    <>
    <section className="flex flex-row items-center gap-1">
    <span style={{backgroundColor:statuscolor, padding:"10px", borderRadius:"100%"}}></span>
      {status ? `${status}` : 'No status provided'}
    </section>
    </>
  )
}

export default StatusHistory
