<template>
	<div class="absolute top-0 left-0 w-full h-full"
		:style="{background: `linear-gradient(145deg,#7E5B6B,#3E3554)`}"	
	>
		<div class="absolute w-full h-full"
			:style="{background: `url('${data.bgImg}') center bottom/cover no-repeat`}"
		></div>
		<div :class="{active: isActive}" class="relative top-1/2 mb-4" >
			<h1 class="relative text-4xl text-center -top-10 text-white drop-shadow-main">Weather App</h1>
			<input 
				type="text" 
				class="relative left-1/2 -top-4 -translate-x-1/2 w-1/4 h-10 placeholder:text-xl p-2 shadow-gray-700 rounded-lg"
				v-model.trim="searchValue"
				@keyup.enter="search"
			>
		</div>
		<div 
			v-if="data.city" 
			class="relative w-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
		>
			<img class="absolute w-full h-full rounded-md" :src="`${data.bgImg}`" alt="">
			<div class="p-8">
				<h1 class="text-4xl text-center font-semibold text-white drop-shadow-main" >{{ data.city + ',' + data.country}}</h1>
				<p class="text-center relative text-white my-2">{{ currentTime }}</p>
				<div class="left-1/2 absolute bg-[rgba(255,255,255,0.4)] drop-shadow-main h-36 w-60 -translate-x-1/2 rounded-md">
					<h1 class="text-5xl text-center font-semibold drop-shadow-main text-white relative top-1/2 -translate-y-1/2">{{ data.temp }}<sup>o</sup>C</h1>
				</div>
				<h1 class="text-3xl text-center font-semibold drop-shadow-main mt-40 text-white">{{ data.cloud }}</h1>
				<div class="relative z-1 flex justify-around mt-6">
					<div class="">
						<img class="h-6 m-auto" src="./assets/icon/visibility.png" alt="">
						<p class="">{{ data.visibility }}m</p>
					</div>
					<div class="">
						<img class="h-6 m-auto" src="./assets/icon/humidity.png" alt="">
						<p class="">{{ data.humidity }}%</p>
					</div>
					<div class="">
						<img class="h-6 m-auto" src="./assets/icon/wind.png" alt="">
						<p class="">{{ data.windSpeed }}m/s</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue';

import rain from './assets/image/rain.jpg';
import cloud from './assets/image/cloud.jpg';
import sunny from './assets/image/sunny.jpg';

export default {
	setup() {
		const searchValue = ref('');
		const currentTime = ref('')
		const isActive = ref(false)
		const data = reactive({
			bgImg: '',
			city: '', //Tên thành phố
			country: '',//tên đất nước
			visibility: 0,//tầm nhìn
			temp: 0,//nhiệt độ
			humidity: 0,//độ ẩm
			windSpeed: 0,//tốc độ gió
			cloud: '',
		});
		
		onMounted(() => {
			setInterval(() => {
				currentTime.value = new Date().toLocaleString('vi')
			},1000)
		})

		const search = async() => {
			try {
				const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=fef4aace5a995bb003ed8fd236513519`)
				if(!response.data) {
					alert('There is no country founded')
				} 
				else {
					data.city = response.data.name;
					data.country = response.data.sys.country;
					data.cloud = response.data.weather[0].main;
					data.visibility = response.data.visibility;
					data.temp = Math.round(response.data.main.temp - 273.15);
					data.humidity = response.data.main.humidity;
					data.windSpeed = response.data.wind.speed;
					
					isActive.value = true

					console.log(data.cloud);
					if(data.cloud === 'Rain') {
						data.bgImg = rain
					} else if (data.cloud === 'Clouds') {
						data.bgImg = cloud
					} else if (data.cloud === 'Sunny') {
						data.bgImg = sunny
					}
				}
			}
			catch {
				alert('There is no country founded')
			} 
		}
		
		return {data, search, searchValue, isActive, currentTime}
	}
}
</script>
<style>
	.active {
		transform: translateY(-200px);
	}
</style>