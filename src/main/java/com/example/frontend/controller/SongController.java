package com.example.frontend.controller;

import com.example.frontend.model.Album;
import com.example.frontend.model.Track;
import com.example.frontend.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/songs")
public class SongController {

    @Autowired
    private CatalogService catalogService;

    /**
     * @return random 25 popular songs tracks
     */
    @GetMapping("/discover")
    public List<Track> discover() {
        List<Track> popularSongs = catalogService.fetchPopularSongs();

        Collections.shuffle(popularSongs);
        return popularSongs.subList(0, Math.min(25, popularSongs.size()));
    }

    /**
     * @return all albums songs
     */
    @GetMapping("/album/{id}")
    public Album albumSongs(@PathVariable String id) {
        return catalogService.fetchAlbumById(id);
    }
}
