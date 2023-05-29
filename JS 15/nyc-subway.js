function getStations(lineName) {
    return fetch("nyc-subway.json")
      .then(response => response.json())
      .then(data => {
        for (line in data.lines) {
          let subwayLine = data.lines[line];
          if (subwayLine.name === lineName) {
            console.log(subwayLine.stations);
            return subwayLine.stations;
          }
       }
    })
    .catch(err => {
    console.log(err);
       });
    }
    console.log(getStations("1"));