import { ICoord } from "@/models/weatherWidget";
import { onMounted, ref } from "vue";

export default function useNavigator() {
    const coordinates = ref<ICoord>({lat: '', lon: ''});
    const getCoordinates = () => {
        return new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    const getCurrentPosition = async () => {
        const position: any = await getCoordinates(); 
        
        return{
            lat: String(position.coords.latitude),
            lon: String(position.coords.longitude)
        }
        
    }

    
    return {
        getCurrentPosition
    }
}