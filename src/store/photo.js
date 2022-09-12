import $ from 'jquery'
import jwt_decode from 'jwt-decode'

const ModulePhoto = {
    state: {
        imgsArr: null,
        id2idx: new Array(),
    },
    getters: {},
    mutations: {
        updatePhotos(state, photos) {
            state.imgsArr = photos;

            for (let i = 0; i < photos.length; ++ i)
                state.id2idx[photos[i].id] = i;
        }
    },
    actions: {
        postPhoto(context, data) {
            let access = localStorage.getItem("access");
            context.commit("confirm_access_valid");

            $.ajax({
                url: "http://101.35.183.71:5288/johnson_iris/photo/photo-view/",
                type: "POST",
                data: data.formData,
                headers: {
                    'Authorization': "Bearer " + access,
                },
                processData: false,
                contentType: false,
                success(resp) {
                    if (resp.result == 'success') data.success();
                    else data.error();
                },
                error() {
                    data.error();
                }
            });
        },

        getPhoto(context, data) {
            let access = localStorage.getItem("access");
            context.commit("confirm_access_valid");

            $.ajax({
                url: "http://101.35.183.71:5288/johnson_iris/photo/photo-view/",
                type: "GET",
                data: {
                    user_id: jwt_decode(access).user_id,
                },
                headers: {
                    'Authorization': "Bearer " + access,
                },
                success(resp) {
                    context.commit('updatePhotos', JSON.parse(resp.photos));
                    data.success();   
                },
                error() {
                    
                }
            });


            
        }
    },
}

export default ModulePhoto;