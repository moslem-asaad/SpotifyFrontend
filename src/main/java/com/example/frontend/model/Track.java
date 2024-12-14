package com.example.frontend.model;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;


public class Track {
    private long durationMs;
    private String id;
    private String name;
    private int popularity;
    private String albumId;
    private List<Artist> artists;
    private String albumPoster;

    public long getDurationMs() {
        return durationMs;
    }

    public void setDurationMs(long durationMs) {
        this.durationMs = durationMs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }

    @JsonGetter("albumId")
    public String getAlbumId() {
        return albumId;
    }

    public List<Artist> getArtists() {
        return artists;
    }

    public void setArtist(List<Artist> artists) {
        this.artists = artists;
    }

    public String getAlbumPoster() {
        return albumPoster;
    }

    @JsonProperty("album")
    public void setAlbumProperties(Album album) {
        this.albumId = album.getId();
        this.albumPoster = String.format("img/%s", album.getImages().get(1).getUrl());
    }
}
