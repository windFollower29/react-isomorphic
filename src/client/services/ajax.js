const KEY = 'HE1902161002471051'

const APIs = {
  fetchCity: 'https://search.heweather.net/find?parameters/',

  fetchTemperature: 'https://free-api.heweather.net/s6/weather/forecast?parameters',

  fetchQuality: 'https://free-api.heweather.net/s6/air/now?parameters'
}

export default {

  async fetchCityList (location = 'guangzhou') {
    return await fetch(`${APIs.fetchCity}&key=${KEY}&location=${location}`)
      .then(res => res.json())
      .then(res => {
        const data = res.HeWeather6[0].basic
        return data
      })
  },

  async fetchTemperature (location = '越秀') {
    // return await fetch(APIs.fetchTemperature, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     key: KEY,
    //     location: encodeURIComponent(location)
    //   })
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res)
    //     // const data = res.HeWeather6[0].daily_forecast[0].cond_txt_d
    //     // return data
    //   })

    return await fetch(`${APIs.fetchTemperature}&key=${KEY}&location=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        const data = res.HeWeather6[0]
        return data
      })
  },

  async fetchQuality (location = '广州') {

    return await fetch(`${APIs.fetchQuality}&key=${KEY}&location=${encodeURIComponent(location)}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        const data = res.HeWeather6[0].air_now_city
        return data
      })
  }
}