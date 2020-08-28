<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div  v-on-clickaway="clickedAway" class="modal-container">
                <div class="google-map" id="map">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-mask { 
    position: fixed; 
    z-index: 9998;
    top: 0;
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-container {
    width: 600px;
    height: 400px ; 
    margin: 0px auto;
    padding: 2px 3px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}
.modal-body {
    margin: 20px 0;
}
.modal-default-button {
    float: right;
}
.modal-enter {
    opacity: 0;
}
.modal-leave-active {
    opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.google-map{
    width : 100% ;
    height :100% ; 
    background :#fff; 
}
</style>


<script>
import https from 'https';
import { mixin as clickaway } from 'vue-clickaway';
//import * as VueGoogleMaps from 'vue2-google-maps'

export default {
    mixins: [ clickaway ],

    props: ['product'],
    data() {
        return {
            attachment: null
        }
    },
    computed: {
        data: function() {
            if (this.product != null) {
                return this.product
            }
            return {
                name: "",
                units: "",
                price: "",
                description: "",
                image: false
            }
        }
    },
    mounted(){
        this.renderMap() ; 
    } ,
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map') , {
                center:{lat :0 ,lng:0 },
                zoom:3 , 
                maxZoom :15 , 
                minZoom : 3 ,
                streetViewControl : false 
            }) ; 
            var marker = new google.maps.Marker({
                position: {lat :0 ,lng:0 },
                map: map,
                draggable: true,
                title: 'Hello World!'
            });
            marker.addListener('click', this.toggleBounce(marker));

        },
        toggleBounce(marker) {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        },
        clickedAway(event){
            this.$emit('clickedAway') ; 
        } , 
        attachFile(event) {
            this.attachment = event.target.files[0];
        },
        uploadFile(event) {
            if (this.attachment != null) {
                var formData = new FormData();
                formData.append("image", this.attachment)
                let headers = {'Content-Type': 'multipart/form-data'} ; 
                const httpsAgent = new https.Agent({ rejectUnauthorized: false });

                axios.post("/api/upload-file", formData, {httpsAgent , headers}).then(response => {
                    this.product.image = response.data
                    this.$emit('close', this.product)
                })
            } else {
                this.$emit('close', this.product)
            }
        }
    }
}
</script>