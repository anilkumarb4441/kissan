import React from 'react'

export default function sample() {
  return (
    <div>sample
    

    <div className='addTable_appoint'>
                            {masterAppointment === 'master' ?
                                <div className='masterAppoinChoose_ope'>
                                    <p>Choose Operators appointments</p>
                                    <div className="filterWraper" onClick={() => setDropdownOpen(!dropdownOpen)} >
                                        <div className='filtrName'>
                                            <p>{dropdownOptions}</p>
                                            <IoMdArrowDropdown className={dropdownOpen ? 'iconRotateDrop' : ''} />
                                        </div>
                                        {/* {dropdownOpen && <div className='filter_dropdown'>
                                            <p onClick={() => { setDropdownOption('1 Day') }}>1 Day</p>
                                            <p onClick={() => { setDropdownOption('2 Day') }}>2 Day</p>
                                            <p onClick={() => { setDropdownOption('1 Week') }}>1 Week</p>
                                        </div>} */}
                                    </div>
                                </div>
                                :
                                null}
                        </div>
    
    
                        {masterAppointment === 'master' ?
                                    <div className="filterWraper" onClick={() => setShowOperartor(!showOPerator)} style={{ width: '200px' }}>
                                        <div className='filtrName'>
                                            <p>{chooseOPerator}</p>
                                            <IoMdArrowDropdown className={showOPerator ? 'iconRotateDrop' : ''} />
                                        </div>
                                        {showOPerator && <div className='filter_dropdown'>
                                            <p onClick={() => { setchooseOPerator('1 Day') }}>1 Day</p>
                                            <p onClick={() => { setchooseOPerator('2 Day') }}>2 Day</p>
                                            <p onClick={() => { setchooseOPerator('1 Week') }}>1 Week</p>
                                        </div>}
                                    </div>

                                    :
                                    <>
                                        {/* <div className='addAppoint_Btn' onClick={()=>setAddAppoinMent(true)}>+ Add Appointments</div> */}
                                        {null}
                                    </>
                                }
    </div>
  )
}


