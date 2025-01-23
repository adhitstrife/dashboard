import useGetListVisit from "@/hooks/visit/useGetListVisit"
import { visitFilterAtom } from "@/state/data/visit/visitFilterAtom"
import { visitListAtom } from "@/state/data/visit/visitListAtom"
import { Box } from "@mantine/core"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useAtomValue } from "jotai"
import { useEffect } from "react"

export const Map = () => {
    const visitList = useAtomValue(visitListAtom)
    const visitFilter = useAtomValue(visitFilterAtom)
    const { isLoadingGetListVisit, getListVisit } = useGetListVisit();

    const containerStyle = {
        width: '100%',
        height: '500px',
    };

    const center = {
        lat: 0, // Set default latitude
        lng: 0, // Set default longitude
    };

    const mapCenter = (visitList?.results && visitList.results.length > 0)
        ? { lat: Number(visitList.results[0].latitude), lng: Number(visitList.results[0].longitude) }
        : center;

    return (
        <Box>
            {visitList && (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                    {visitFilter.salesId && visitFilter.is_filtered ? (
                        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={21}>
                        {visitList.results.map((visit, index) => (
                            <Marker key={index} position={{ lat: Number(visit.latitude), lng: Number(visit.longitude)}} label={{
                                text: `${index + 1}`, // Display order number
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }} />
                        ))}
                    </GoogleMap>
                    ) : (
                        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={21}>
                            {visitList.results.map((visit, index) => (
                                <Marker key={index} position={{ lat: Number(visit.latitude), lng: Number(visit.longitude)}}  />
                            ))}
                        </GoogleMap>
                    )}
                </LoadScript>

            )}
        </Box>
    )
}