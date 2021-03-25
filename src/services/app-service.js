let apiUrl = 'https://localhost:44337/api/';

export async function postData(url = '', data = {}, onSuccess, onFailure) {
    // Default options are marked with *
    await fetch(apiUrl + url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((response) => response.text())
    .then((data) => data ? JSON.parse(data) : {})
    .then((data) => {
        if(data === null || (!data.error && !data.userFriendlyMessage)){
            onSuccess(data);
        }
        else{
            if(data.error)
            {
                //toast.error(data.error_description ?? data.error);
            }
            else {
                if(onFailure)
                {
                    onFailure(data);
                }
                else {
                    //toast.error(data.userFriendlyMessage);
                }
            }
        }
    })
    .catch((error) => {
        //toast.error(error)
    });
};