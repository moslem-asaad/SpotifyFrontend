package com.example.frontend.model;

import java.util.List;

public class Album {
    private String id;
    private String name;
    private String uri;
    private String releaseDate;
    private int totalTracks;
    private List<AlbumImage> images;
    private List<Track> tracks; // Added field for tracks

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

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getTotalTracks() {
        return totalTracks;
    }

    public void setTotalTracks(int totalTracks) {
        this.totalTracks = totalTracks;
    }

    public List<AlbumImage> getImages() {
        return images;
    }

    public void setImages(List<AlbumImage> images) {
        this.images = images;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }
}
