import certifications from "../mocks/certifications.json"
import CertificationCard from "./CertificationCard"
import { useState } from 'react'

const CertificationsContainer = ({ name }) => {
  console.log(name);
  const [showedCertifications, setShowedCertifications] = useState(certifications.slice(0, 3))

  const [remainingCertification, setRemainingCertification] = useState(certifications.slice(3))

  const loadMore = () => {
      const nextShowedCertifications = remainingCertification.slice(0, 3)
      setShowedCertifications([...showedCertifications, ...nextShowedCertifications])
      setRemainingCertification(remainingCertification.slice(3))
  }

  return (
    <div id="certifications-section" className="mt-5">
      <h3 id="certicication-title" className="font-[700] text-[24px] ">Certificaciones</h3>
      {name}
      <div id="certifications-card-container" className="flex flex-col">
          {
            showedCertifications.map(c => <CertificationCard key={crypto.randomUUID()} object={c} />)
          }
      </div>
      {
        showedCertifications.length !== certifications.length
          && <button id="load-more-btn" onClick={loadMore} className="w-auto mx-auto mt-8 py-1 px-3 flex items-center justify-center bg-white border border-black rounded-full text-base text-black" dark>Mostrar más</button>
      }
    </div>
  )
}

export default CertificationsContainer