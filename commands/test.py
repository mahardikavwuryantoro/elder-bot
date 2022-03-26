import animelyrics
import sys

try:
     lyrics = animelyrics.search_lyrics(sys.argv[1], show_title = True)
     print(lyrics)
except animelyrics.NoLyricsFound:
     print('Lyrics not found')
sys.stdout.flush()