package com.example.frontend.service;

import com.example.frontend.model.Album;
import com.example.frontend.model.Artist;
import com.example.frontend.model.Track;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class CatalogService {

    private final WebClient webClient;

    public CatalogService(WebClient.Builder webClientBuilder, @Value("${frontend.catalogServiceURL}") String catalogURL) {
        this.webClient = webClientBuilder.baseUrl(catalogURL).build();
    }

    public List<Track> fetchPopularSongs() {
        Track[] songs = this.webClient
                .get()
                .uri("/popularSongs")
                .retrieve()
                .bodyToMono(Track[].class)
                .block();

        return songs != null ? Arrays.asList(songs): List.of();
    }

    public Map<String, Artist> fetchPopularArtists() {
        Map<String, Artist> artistMap = this.webClient
                .get()
                .uri("/popularArtists")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        return artistMap != null ? artistMap : Map.of();
    }

    public Album fetchAlbumById(String albumId) {
        return this.webClient
                .get()
                .uri(uriBuilder -> uriBuilder.path("/albums/{id}").build(albumId))
                .retrieve()
                .bodyToMono(Album.class)
                .block();
    }
}