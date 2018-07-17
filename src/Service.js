
getJson = () => {
    let th = this
    axios.get('http://192.168.100.227:8000/api/favorite')
        .then(function (response) {
            //console.log(response.data);
            //list = response.data;
            th.setState({ plsList: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    return
}