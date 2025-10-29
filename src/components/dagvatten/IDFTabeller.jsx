import React from "react";

export default function IDFTabeller() {
  return (
    <div className="bg-white rounded-lg">
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          IDF Tabell enligt P110
        </h2>
        <p className="text-sm text-gray-700 mt-2">
          Regnintensitet (l/s-ha) för Lidköping
        </p>
      </div>

      {/* IDF Table */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-6">
        {/* Table Header */}
        
          <div className="grid grid-cols-7 divide-x divide-gray-200 text-sm text-center font-medium text-white">
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">Varaktighet</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=2 år</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=5 år</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=10 år</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=25 år</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=50 år</div>
            <div className="py-2  bg-gradient-to-r to-[#7450a9] from-[#6679e3]">T=100 år</div>
          </div>
       

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {/* Row 1 */}
          <div className="grid grid-cols-7 divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium ">
            <div className=" py-2">5 min</div>
            <div className=" py-2">250 </div>
            <div className=" py-2">310 </div>
            <div className=" py-2">360 </div>
            <div className=" py-2">420 </div>
            <div className=" py-2">470 </div>
            <div className=" py-2">520 </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-7 divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium  bg-gray-50">
            <div className="py-2">10 min</div>
            <div className="py-2">185</div>
            <div className="py-2">230</div>
            <div className="py-2">270</div>
            <div className="py-2">315</div>
            <div className="py-2">355</div>
            <div className="py-2">395</div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-7 divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium">
            <div className="py-2 ">15 min</div>
            <div className="py-2 ">155</div>
            <div className="py-2 ">195</div>
            <div className="py-2 ">225</div>
            <div className="py-2 ">265</div>
            <div className="py-2 ">300</div>
            <div className="py-2 ">335</div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium bg-gray-50">
            <div className=" py-2">20 min</div>
            <div className=" py-2">135</div>
            <div className=" py-2">170</div>
            <div className=" py-2">200</div>
            <div className=" py-2">235</div>
            <div className=" py-2">270</div>
            <div className=" py-2">305</div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium">
            <div className=" py-2">30 min</div>
            <div className=" py-2">110</div>
            <div className=" py-2">140</div>
            <div className=" py-2">165</div>
            <div className=" py-2">195</div>
            <div className=" py-2">225</div>
            <div className=" py-2">255</div>
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium bg-gray-50">
            <div className=" py-2">45 min</div>
            <div className=" py-2">90</div>
            <div className=" py-2">115</div>
            <div className=" py-2">135</div>
            <div className=" py-2">160</div>
            <div className=" py-2">185</div>
            <div className=" py-2">210</div>
          </div>

          {/* Row 7 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium">
            <div className=" py-2">60 min</div>
            <div className=" py-2">75</div>
            <div className=" py-2">95</div>
            <div className=" py-2">115</div>
            <div className=" py-2">135</div>
            <div className=" py-2">155</div>
            <div className=" py-2">175</div>
          </div>

          {/* Row 8 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium bg-gray-50">
            <div className=" py-2">90 min</div>
            <div className=" py-2">60</div>
            <div className=" py-2">75</div>
            <div className=" py-2">90</div>
            <div className=" py-2">105</div>
            <div className=" py-2">120</div>
            <div className=" py-2">135</div>
          </div>

          {/* Row 9 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium">
            <div className=" py-2">120 min</div>
            <div className=" py-2">50</div>
            <div className=" py-2">62</div>
            <div className=" py-2">75</div>
            <div className=" py-2">88</div>
            <div className=" py-2">100</div>
            <div className=" py-2">112</div>
          </div>

          {/* Row 10 */}
          <div className="grid grid-cols-7  divide-x divide-gray-200 text-center text-gray-600 text-xs font-medium bg-gray-50">
            <div className=" py-2">180 min</div>
            <div className=" py-2">40</div>
            <div className=" py-2">50</div>
            <div className=" py-2">60</div>
            <div className=" py-2">70</div>
            <div className=" py-2">80</div>
            <div className=" py-2">90</div>
          </div>
        </div>
      </div>

     
      {/* Information Section */}
      <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          IDF-kurvor (Intensitet-Duration-Frequency)
        </h3>
        <p className="text-sm text-blue-800">
        IDF-kurvorna visar regnintensitet som funktion av regnets varaktighet och återkomsttid. Data baseras på SMHI:s klimatstatistik och P110:s rekommendationer. Alla värden är validerade mot svenska fysikaliska gränser.
        </p>
      </div>
    </div>
  );
}
