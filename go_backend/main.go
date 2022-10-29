package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/mux"
)

func main() {
	log.Println("Server starting...")

	r := mux.NewRouter().StrictSlash(true)
	r.HandleFunc("/api/movies", PostMoviesHandler).Methods("POST")
	r.HandleFunc("/api/movies", GetMoviesHandler).Methods("GET")
	r.HandleFunc("/api/deletemovie", DeleteMovieHandler).Methods("POST")
	r.HandleFunc("/api/getmovie", GetMovieByIdHandler).Methods("POST")

	server := &http.Server{
		Addr:    ":8095",
		Handler: r,
	}
	server.ListenAndServe()

	log.Println("Server ending...")
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

type Movie struct {
	Id    int
	Title string
	Cover string
}

var movieStore = make(map[int]Movie)
var i int = 0

func PostMoviesHandler(w http.ResponseWriter, r *http.Request) {

	i++
	var movie = Movie{
		Id:    i,
		Title: r.FormValue("title"),
		Cover: r.FormValue("cover"),
	}
	//nId := strconv.Itoa(i)
	movieStore[i] = movie
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Credentials", "true")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusCreated)
	jsonData, err := json.Marshal(movie)
	if err != nil {
		fmt.Println(err.Error())
	}
	w.Write(jsonData)

}

func GetMoviesHandler(w http.ResponseWriter, r *http.Request) {
	var movies []Movie

	keys := make([]int, 0, len(movieStore))

	for k := range movieStore {
		keys = append(keys, k)
	}
	sort.Ints(keys)

	for _, k := range keys {
		movies = append(movies, movieStore[k])
	}

	data, err := json.Marshal(movies)

	if err != nil {
		fmt.Println(err.Error())
	}
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	w.Write(data)
}

func DeleteMovieHandler(w http.ResponseWriter, r *http.Request) {
	key := r.FormValue("id")
	newKey, _ := strconv.Atoi(key)
	if _, ok := movieStore[newKey]; ok {
		delete(movieStore, newKey)
	} else {
		log.Printf("Değer bulunamadı : %s", key)
	}
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
func GetMovieByIdHandler(w http.ResponseWriter, r *http.Request) {
	var movies []Movie
	key := r.FormValue("id")
	newKey, _ := strconv.Atoi(key)
	if _, ok := movieStore[newKey]; ok {
		movies = append(movies, movieStore[newKey])
		data, err := json.Marshal(movies)

		if err != nil {
			fmt.Println(err.Error())
		}
		w.Write(data)
	} else {
		log.Printf("Değer bulunamadı : %s", key)
	}
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
