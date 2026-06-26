import {Icon} from '@iconify/react'

export default function Voordelen() {
    return (
        <>
        <div className="intro flex flex-col justify-center text-center pt-16 lg:pt-32">
            <h2 className="text-center">Voordelen van een hondenuitlaatservice</h2>
            <p className="text-center">Elk detail telt wanneer het om het welzijn van jouw viervoeter gaat. Met de onderstaande voordelen maak ik het verschil:</p>
        </div>
            
            <div className="cards-container flex flex-col lg:flex-row gap-6">



                <div className="card w-full lg:w-1/4 border-4 rounded-3xl border-[var(--dark-blue)] shadow-[4px_4px_0px_0px_var(--accent-color)] p-8 bg-white">
                    <div className="icon bg-[var(--accent-color)] p-4 inline-block border-[var(--dark-blue)] rounded-full border-4 mb-6 justify-center">
                        <Icon icon="solar:shield-check-linear" width="24" height="24" color="#3a5a70"></Icon>
                    </div>
                    <h3>De 'scan'</h3>
                    <p className="mb-0">Met een waakzame blik anticipeer ik continu op de omgeving. Ik zie prikkels, zoals andere honden of situaties, lang voordat jouw hond ze opmerkt, voor maximale rust en veiligheid.</p>
                </div>



                <div className="card card w-full lg:w-1/4 border-4 rounded-3xl border-[var(--dark-blue)] shadow-[4px_4px_0px_0px_var(--accent-color)] p-8 bg-white">
                    <div className="icon bg-[var(--accent-color)] p-4 inline-block border-[var(--dark-blue)] rounded-full border-4 mb-6 justify-center">
                        <Icon icon="solar:eye-linear" width="24" height="24" color="#3a5a70"></Icon>
                    </div>
                    <h3>Lichaamstaal</h3>
                    <p className="mb-0">Ik kijk echt naar de hond. We wandelen tot jouw viervoeter voldaan en rustig is. De behoeften van jouw hond bepalen het tempo.</p>
                </div>



                <div className="card w-full lg:w-1/4 border-4 rounded-3xl border-[var(--dark-blue)] shadow-[4px_4px_0px_0px_var(--accent-color)] p-8 bg-white">
                    <div className="icon bg-[var(--accent-color)] p-4 inline-block border-[var(--dark-blue)] rounded-full border-4 mb-6 justify-center">
                        <Icon icon="solar:hand-heart-linear" width="24" height="24" color="#3a5a70"></Icon>
                    </div>
                    <h3>Jouw hond, jouw alles</h3>
                    <p className="mb-0">Ik begrijp dat je hond alles voor je is. Daarom ontzorg ik jou volledig. Veiligheid en welzijn zijn prioriteit nummer één, met warme, professionele service.</p>
                </div>



                <div className="card w-full lg:w-1/4 border-4 rounded-3xl border-[var(--dark-blue)] shadow-[4px_4px_0px_0px_var(--accent-color)] p-8 bg-white">
                    <div className="icon bg-[var(--accent-color)] p-4 inline-block border-[var(--dark-blue)] rounded-full border-4 mb-6 justify-center">
                        <Icon icon="solar:calendar-linear" width="24" height="24" color="#3a5a70"></Icon>
                    </div>
                    <h3>Verplichte intake</h3>
                    <p className="mb-0">Vertrouwen moet je opbouwen. Ik wil jouw hond écht kennen en begrijpen nog voordat we de deur uitgaan. Daarom is een uitgebreide kennismaking vooraf altijd verplicht.</p>
                </div>


            </div>
</>
    )
}