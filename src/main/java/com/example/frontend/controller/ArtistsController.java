package com.example.frontend.controller;

import com.example.frontend.model.Artist;
import com.example.frontend.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/artists")
public class ArtistsController {

    @Autowired
    private CatalogService catalogService;

    /**
     * @return random 25 popular artist
     */
    @GetMapping("/discover")
    public List<Artist> discover() {
        Map<String, Artist> popularArtistsMap = catalogService.fetchPopularArtists();
        List<Artist> popularArtists = popularArtistsMap.values().stream().collect(Collectors.toList());
        Collections.shuffle(popularArtists);
        return popularArtists.subList(0, Math.min(25, popularArtists.size()));
    }
}
