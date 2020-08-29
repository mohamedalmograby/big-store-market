<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div  v-on-clickaway="clickedAway" class="modal-container">
                <h5 class="header" >drag the marker to address location</h5>
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
.header{
    margin-top: 0;
    color: #42b983;
    text-align: center;

}
.google-map{
    width : 100% ;
    height :88% ; 
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
                position: map.getCenter(),
                map: map,
                draggable: true,
                title: 'cuurent location'
            });
            var geocoder = new google.maps.Geocoder();

            map.addListener('center_changed', function() {
                marker.setPosition(map.getCenter()) ;
            });
            marker.addListener('position_changed', ()=>{
                var address = this.getAddress(marker.getPosition() , map , geocoder) ; 
                this.$emit('marker_position_changed' , address) ; 
            });
           

        },
        getAddress(latlng , map , geocoder){
            // this function should return the address:string but google api require billing 
            // so we will just return latlng as a string instade


            return 'lat : ' + latlng.lat().toString() + ' , lng : ' + latlng.lng().toString() ; 
        } , 
        
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