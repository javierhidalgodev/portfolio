const CertificationCard = ({ object }) => {
  const { title, centre, date, duration, link } = object
  const formatCentre = centre.reduce((acc, val) => acc + ', ' + val)

  return (
    <div className="certification-card flex justify-between py-4 border-b">
      <div className="certification-card__left">
        <h2 className="text-lg text-[var(--accent-color)] font-medium">{title}</h2>
        <p className="text-base">{formatCentre} {date && `| ${date}`} {duration && `| ${duration}`}</p>
      </div>
      <div className="certification-card__right">
        <a href={link} target="_blank" rel="noopen" className="w-auto py-[4px] px-[14px] flex items-center justify-center bg-white rounded-full text-base hover:scale-105 hover:text-[#00271e] hover:bg-[#dbff00] text-black font-[700] border border-red dark:border-transparent duration-100">Ver</a>
      </div>
    </div>
  )
}

export default CertificationCard